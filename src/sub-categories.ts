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

async function addSubCategories() {
  try {
    const categoriesRef = db.collection('categories')
    const cat = await categoriesRef.get()
    const massiveOfCategories = cat.docs[0].data().categories

    // Create a new document in the 'categories' collection called 'sub_categories'
    await categoriesRef.doc('sub_categories').set({}, { merge: true })

    // Loop through the main categories and add them as keys with empty arrays as values
    for (const category of massiveOfCategories) {
      const subCategoryObj = {}
      subCategoryObj[category] = []
      await categoriesRef.doc('sub_categories').set(subCategoryObj, { merge: true })
    }
  } catch (error) {
    console.log(error)
  }
}

async function fillSubCategories() {
  try {
    const companiesRef = db.collection('companies')
    const subCategoriesRef = db.collection('categories').doc('sub_categories')
    const companies = await companiesRef.get()

    for (const company of companies.docs) {
      const categoriesStr = company.data().categories
      const categoriesArr = categoriesStr.split(':')

      for (let i = 0; i < categoriesArr.length; i++) {
        const categoryPathArr = categoriesArr[i].split('/')
        let currCategory = ''

        for (let j = 1; j < categoryPathArr.length; j++) {
          currCategory += '/' + categoryPathArr[j]

          if (j === 2 || categoryPathArr[j].includes('&')) {
            // Found a sub-category, add it to the corresponding category in sub_categories doc
            const currValue = (await subCategoriesRef.get()).data()?.[categoryPathArr[1]] || []
            const subCategory = categoryPathArr[j]
            if (!currValue.includes(subCategory)) {
              currValue.push(subCategory)
              await subCategoriesRef.set({ [categoryPathArr[1]]: currValue }, { merge: true })
            }
          }

          if (categoryPathArr[j].includes(':')) {
            // Reached end of main categories, break out of loop
            break
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

fillSubCategories()
