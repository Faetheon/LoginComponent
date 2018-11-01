const Sequelize = require('sequelize');
const loremIpsum = require('./MOCK_DATA.json');
const { urls } = require('./IMAGE_URLS.json');

let sequelize = new Sequelize('postgres', 'nathan', 'student', {
  host: 'localhost',
  dialect: 'postgres'
});

function genData() {
  sequelize.query('CREATE TABLE products (id SERIAL PRIMARY KEY, short_desc VARCHAR, image_url VARCHAR, rating DECIMAL, reviews INTEGER, price VARCHAR, category VARCHAR(255), purchase_url VARCHAR);')
  .then(data => {
    for (let i = 0; i < urls.length; i++) {
      let {short_desc, rating, reviews, price} = loremIpsum[i];
      sequelize.query(
        `INSERT INTO products (short_desc, image_url, rating, reviews, price, category, purchase_url) VALUES ('${short_desc}', '${urls[i]}', '${rating}', '${reviews}', '${price}', 'Electronics', '${urls[i]}')`,
        {type: sequelize.QueryTypes.INSERT}
      );
    }
    return data;
  });
};

sequelize.query("DROP DATABASE recommended_products;")
.then(data => {
  sequelize.query("CREATE DATABASE recommended_products;")
    .then(data => {
      sequelize.close();
      sequelize = new Sequelize('recommended_products', 'nathan', 'student', {
        host: 'localhost',
        dialect: 'postgres'
      });
      genData();
    });
})
.catch(err => {
  const stringErr = JSON.stringify(err.original);
  if (/3D000/.test(stringErr)) {
    console.log('Database not found, creating new database');
    sequelize.query("CREATE DATABASE recommended_products;")
    .then(data => {
      sequelize.close();
      sequelize = new Sequelize('recommended_products', 'nathan', 'student', {
        host: 'localhost',
        dialect: 'postgres'
      });
      genData();
    });
  } else {
    throw err;
  }
});

