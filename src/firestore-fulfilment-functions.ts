/* eslint-disable */
// @ts-nocheck

const admin = require('firebase-admin')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

// Initialize Firebase App
const serviceAccount = require('./brand-discovery-2a140-firebase-adminsdk-2wult-d3ee3b1a11.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://brand-discovery-2a140-default-rtdb.firebaseio.com',
})

require('firebase/auth')
require('firebase/firestore')

const db = admin.firestore()

// Use Stealth plugin to make Puppeteer undetectable
puppeteer.use(StealthPlugin())

async function scrapeGoogleImages() {
  try {
    const companiesRef = db.collection('companies')
    const companies = await companiesRef.get()
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    for (const company of companies.docs) {
      if (!company.data().profile_name || company.data().profile_name == 'undefined') {
        console.log(`Deleting ${company.id} from Firestore`)
        await companiesRef.doc(company.id).delete()
        continue
      }

      if (company.data().picture_1) {
        console.log(`${company.data().profile_name} already has pictures! Skip.`)
        continue
      }
      const query = encodeURIComponent(company.data().profile_name)
      console.log(query)
      const url = `https://www.google.com/search?q=${query}&tbm=isch`
      const test =
        company.data().profile_name == "L'IMAGE" ||
        company.data().profile_name == 'Struckk Store' ||
        company.data().profile_name == 'ʀᴇʙᴇʟʟɪᴏᴜꜱ ᴠɪxᴇɴ'

      if (test) {
        console.log(`Deleting ${company.data().profile_name} from Firestore`)
        await companiesRef.doc(company.id).delete()
        continue
      }

      if (!company.data().picture_1 || company.data().picture_1.trim() === '') {
        console.log(`Deleting ${company.data().profile_name} from Firestore`)
        await companiesRef.doc(company.id).delete()
        continue
      }

      await page.goto(url)
      await page.waitForSelector('.rg_i')

      const imageUrls = await page.evaluate(() => {
        const urls = []

        const images = document.querySelectorAll('.rg_i')

        for (const image of images) {
          if (urls.length === 5) break

          const url = image.dataset.src
          if (url && url.startsWith('http')) {
            urls.push(url)
          }
        }

        return urls
      })

      const updatedData = {
        picture_1: imageUrls[0] || '',
        picture_2: imageUrls[1] || '',
        picture_3: imageUrls[2] || '',
        picture_4: imageUrls[3] || '',
        picture_5: imageUrls[4] || '',
      }

      await companiesRef.doc(company.id).set(updatedData, { merge: true })

      console.log(`Images added successfully for ${company.data().profile_name}`)
    }

    await browser.close()

    // Pause for 15 seconds before ending script to avoid getting banned by Google
    await new Promise((resolve) => setTimeout(resolve, 15000))
  } catch (error) {
    console.error(error)
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
}

const db = admin.firestore()

const scrapeInstagramProfile = async (page, url) => {
  const randomIndex = Math.floor(Math.random() * userAgentList.length)
  const randomUserAgent = userAgentList[randomIndex]

  await page.setUserAgent(randomUserAgent)

  await page.setDefaultNavigationTimeout(60000)
  await page.goto(url)

  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight)
  })

  await page.waitForTimeout(1000)

  await page.evaluate(() => {
    window.scrollBy(0, -window.innerHeight)
  })

  // Obtain the image URL from the meta tag
  let imageUrl = ''

  const ogImageMeta = await page.$('meta[property="og:image"]')

  if (ogImageMeta) {
    imageUrl = await page.evaluate((el) => el.content, ogImageMeta)
  }

  // Obtain the JSON data containing profile info and parse it
  const sharedDataString = await page.$eval('script[type="application/ld+json"]', (el) => el.innerText)
  const { author, description } = JSON.parse(sharedDataString)
  const { name, identifier } = author
  const { value } = identifier

  return {
    name: name || value || '',
    description: description || '',
    imageUrl: imageUrl || '',
  }
}

const userAgentList = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
]

const scrapeCompaniesInstagramInfo = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })
  const page = await browser.newPage()

  const companies = await db.collection('companies').get()

  for (const company of companies.docs) {
    const instagramUrl = company.get('instagram_url')
    if (!instagramUrl) continue

    const profileName = company.get('profile_name')
    const profileImageUrl = company.get('profile_image_url')
    if (profileName || profileImageUrl) {
      console.log(`This company already has info: ${company.id}, going next`)
      continue
    }

    const match = instagramUrl.match(/instagram\.com\/([a-zA-Z0-9._]+)/)
    if (!match) continue

    const username = match[1]
    const url = `https://www.instagram.com/${username}/`

    try {
      const { name, description, imageUrl } = await scrapeInstagramProfile(page, url)

      await company.ref.update({
        profile_name: name,
        description,
        profile_image_url: imageUrl,
      })

      console.log(
        `Updated company ${company.id}: profile_name=${name}, description=${
          description ? 'got desc' : 'no desc'
        }, profile_image_url=${imageUrl ? 'got image' : 'no progile image'}`,
      )
    } catch (error) {
      console.error(`Error updating company ${company.id}:`, error)
    }
    await new Promise((resolve) => setTimeout(resolve, 25000))
  }

  await browser.close()
}

/*

PARSER 

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()

const firestoreData = []


jsonData.forEach((item) => {
  const { _id, facebook_url, instagram_url, loc_latitude, linkedin_url, loc_longitude } = item
  const newItem = {
    _id: _id ?? '', // use empty string as default for undefined _id
    facebook_url: facebook_url ?? '', // use empty string as default for undefined facebook_url
    instagram_url: instagram_url ?? '', // use empty string as default for undefined instagram_url
    linkedin_url: linkedin_url ?? '',
    loc_latitude: loc_latitude ?? 0, // use 0 as default for undefined loc_latitude
    loc_longitude: loc_longitude ?? 0, // use 0 as default for undefined loc_longitude
  }
  try {
    firestoreData.push(newItem)
  } catch (error) {
    alert(error)
  }
})

import jsonData from 'src/jsons/output-00000000000*.json'

const sendData = async () => {
  try {
    const chunkSize = 500
    const chunks = []

    for (let i = 0; i < firestoreData.length; i += chunkSize) {
      const batch = firestore.batch()
      const chunk = firestoreData.slice(i, i + chunkSize)

      for (const item of chunk) {
        const docRef = firestore.collection('companies').doc()
        batch.set(docRef, item)
      }

      chunks.push(batch)
    }

    for (const batch of chunks) {
      await batch.commit()
      console.log('Batch committed successfully.')
    }
    console.log('All data added successfully.')
  } catch (error) {
    console.error(error)
  }
}

P.S. перед тем как парсить джейсон необходимо сделать его массивом объектов
*/
