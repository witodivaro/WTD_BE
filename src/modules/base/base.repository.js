class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async destroy(where) {
    return await this.model.destroy({ where });
  }

  async findAll(options) {
    return await this.model.findAll(options);
  }

  async create(instance) {
    return await this.model.create(instance);
  }

  update = async (id, patch) => {
    const instance = await this.model.findByPk(id);

    for (const prop in patch) {
      instance[prop] = patch[prop];
    }

    return await instance.save();
  };
}

module.exports = BaseRepository;
