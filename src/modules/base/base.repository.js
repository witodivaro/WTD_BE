class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  destroy = async (where) => {
    return await this.model.destroy({ where });
  };

  findAll = async (options) => {
    return await this.model.findAll(options);
  };

  findOne = async (options) => {
    return await this.model.findOne(options);
  };

  findById = async (id) => {
    return await this.model.findByPk(id);
  };

  create = async (instance) => {
    return await this.model.create(instance);
  };

  update = async (id, patch) => {
    const instance = await this.model.findByPk(id);

    for (const prop in patch) {
      instance[prop] = patch[prop];
    }

    return await instance.save();
  };
}

module.exports = BaseRepository;
