import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Recipient extends Model {
  static start(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        house_number: Sequelize.STRING,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    /**
     * Que tramoia linda...Pego minha própria classe Recipient e
     * passo como parametro para o método paginate.
     * Dessa forma quando eu chamar o método 'paginate', já terei
     * também uma instancia da minha classe Recipient já com o
     * método paginate disponível dentro dela
     */
    sequelizePaginate.paginate(Recipient);

    return this;
  }
}

export default Recipient;
