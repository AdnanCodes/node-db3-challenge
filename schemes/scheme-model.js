const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id: id })
    .first();
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .where("schemes.id", id);
}

function add(schemeData) {
  return db("schemes")
    .insert(schemeData)
    .then(newScheme => {
      return findById(newScheme[0]);
    });
}

function update(scheme, id) {
  return db("schemes")
    .where({ id: id })
    .update(scheme)
    .then(() => {
      return findById(id);
    });
}
function remove(id) {
  return db("schemes")
    .where({ id: id })
    .del();
}
