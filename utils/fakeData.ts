import { faker } from '@faker-js/faker';


export const generateFakeData = () => {
    return Array.from({length: 30}, (_, idx) => {
        return {
            id: idx + 1,
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
        }
    })
}