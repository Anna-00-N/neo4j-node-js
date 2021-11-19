const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'neo4j://localhost:7687?policy=prd',
  neo4j.auth.basic('neo4j', 'Tset_1820')
);

const session = driver.session();

session.run('RETURN 1')
  .then(result => {
    result.records.forEach(record => {
      console.log(record.get('name'));
    });
  })
  .catch(error => {
    console.log(error);
  })
  .then(() => session.close())

driver.close();