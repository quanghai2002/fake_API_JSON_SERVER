
// set locale to use Vietnamese
const { fakerVI: faker } = require('@faker-js/faker');
const { randomFill } = require('crypto');
const fs = require('fs');



// Random data
// console.log(faker.string.uuid())
// console.log(faker.internet.userName())
// console.log(faker.internet.email())
// console.log(faker.image.avatar())
// console.log(faker.date.birthdate())

// IFFE


// random data
const randomCaterogyList = (n) => {
    const categoryList = [];

    // loop and push categories
    if (n <= 0) {
        return []
    }

    Array.from(new Array(n)).forEach((item) => {
        let category = {
            id: faker.string.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updateAt: Date.now(),
        };
        categoryList.push(category)
    })
    return categoryList

}

function productsList(categoriesList, numberOfProducts) {
    let productsListes = [];

    if (numberOfProducts <= 0) {
        return []
    }

    for (const caterogy of categoriesList) {
        Array.from(new Array(numberOfProducts)).forEach((item) => {
            const product = {
                categoryId: caterogy.id,
                id: faker.string.uuid(),
                name: faker.commerce.department(),
                price: Number.parseFloat(faker.commerce.price()),
                descreption: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updateAt: Date.now(),
                thumbnaiUrl: faker.image.imageUrl(400, 400),

            }

            productsListes.push(product)

        })

    }

    return productsListes

}

function profileList(n) {
    const profileLists = [];
    if (n <= 0) {
        return []
    }
    Array.from(new Array(n)).forEach((item) => {
        let profile = {
            id: faker.string.uuid(),
            fullName: faker.person.fullName(),
            createdAt: Date.now(),
            updateAt: Date.now(),
            gender: faker.person.gender(),
            avatar: faker.image.avatar(),
            birthdate: faker.date.birthdate(),
            email: faker.internet.email(),
        };
        profileLists.push(profile)
    })

    return profileLists;
}

const categoriesList = randomCaterogyList(30)
const products = productsList(categoriesList, 30)
const profile = profileList(100)

// prepare (chuan bi) db object
const db = {
    categories: categoriesList,
    products: products,
    profile: profile,
};


// write db object => db.json
fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generated file successfully');
})

