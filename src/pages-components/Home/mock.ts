import { CompanyType } from 'src/types'

export const companies: { company: CompanyType; images: string[] }[] = [
  {
    company: {
      title: 'Adidas',
      location: 'San Francisco',
      image: '/images/adidas_logo.jpeg',
      followers: 21234,
      tags: ['Sport', 'Test', 'Test1', 'Test2', 'Test3', 'Test4'],
      id: '1',
    },
    images: [
      '/images/adidas1.jpg',
      '/images/adidas2.jpg',
      '/images/adidas3.jpeg',
      '/images/adidas1.jpg',
      '/images/adidas2.jpg',
      '/images/adidas3.jpeg',
    ],
  },
  {
    company: {
      title: 'Nike',
      location: 'San Francisco',
      image: '/images/nice_logo.jpeg',
      followers: 123121,
      tags: ['Sport', 'Test', 'Test1', 'Test2', 'Test3', 'Test4'],
      id: '2',
    },
    images: [
      '/images/nike1.jpeg',
      '/images/nike2.jpeg',
      '/images/nike3.webp',
      '/images/nike1.jpeg',
      '/images/nike2.jpeg',
      '/images/nike3.webp',
    ],
  },
  {
    company: {
      title: 'Puma',
      location: 'San Francisco',
      image: '/images/puma_logo.png',
      followers: 12312423,
      tags: ['Sport', 'Test', 'Test1', 'Test2', 'Test3', 'Test4'],
      id: '3',
    },
    images: [
      '/images/puma1.jpeg',
      '/images/puma2.avif',
      '/images/puma3.jpeg',
      '/images/puma4.avif',
      '/images/puma1.jpeg',
      '/images/puma2.avif',
      '/images/puma3.jpeg',
      '/images/puma4.avif',
    ],
  },
  {
    company: {
      title: 'Reebok',
      location: 'San Francisco',
      image: '/images/reebok_logo.png',
      followers: 1423142,
      tags: ['Sport', 'Test', 'Test1', 'Test2', 'Test3', 'Test4'],
      id: '4',
    },
    images: [
      '/images/reebok1.jpeg',
      '/images/reebok2.jpeg',
      '/images/reebok3.jpeg',
      '/images/reebok4.jpeg',
      '/images/reebok5.webp',
      '/images/reebok1.jpeg',
      '/images/reebok2.jpeg',
      '/images/reebok3.jpeg',
      '/images/reebok4.jpeg',
      '/images/reebok5.webp',
    ],
  },
]
