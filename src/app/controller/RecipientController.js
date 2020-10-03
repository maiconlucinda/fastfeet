import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1, name } = req.query;

    const { docs, pages, total } = await Recipient.paginate({
      // Estou passando que quero algo 'tipo' esse nome, nã precisa ser exato
      where: { name: { [Op.like]: `%${name}%` } },
      // Quantos quero por página
      paginate: 10,
      // Passo qual página quero, a principio a 1 é padrão.
      page,
      // Não vi necessidade mas deixei.
      delivery: [['id', 'DESC']],
    });

    // Retorno é DOCS, todo o conteúdo
    // Page, página que estou
    // Page, que é a quantidade de páginas
    // Quantidade total dados.
    return res.json({ docs, page, pages, total });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      house_number: Yup.string().required(),
      complement: Yup.string().notRequired(),
      state: Yup.string().required(),
      cep: Yup.string().required().min(7).max(10),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Dentro de um objeto, passo um objeto com outro objeto como valor.
    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.name,
        street: req.body.street,
      },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json({ recipient });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(5).max(50),
      street: Yup.string().required().max(80),
      house_number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      cep: Yup.string().required().min(7).max(10),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    /**
     * Os métodos do Model retornam alguns métodos da classe, pelo fato de que o recipient é basicamente um objeto
     * da classe Model, consigo receber o resultado dentro do objeto completo que é retornado pelo método findByPk.
     */
    const recipient = await Recipient.findByPk(id);

    /**
     * Somente atualizando os dados que já estão na memória, pois estou usando a mesma instancia do objeto criado,
     * nisso é possível usar um método update para atualizar esse objeto já criado.
     */
    const {
      name,
      street,
      number,
      complement,
      city,
      state,
      cep,
    } = await recipient.update(req.body);

    return res.status(200).json({
      name,
      number,
      street,
      complement,
      city,
      cep,
      state,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    // O método findByPk retorna alguns métodos juntos com o resultado
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    await recipient.destroy();

    return res.status(204).send();
  }
}

export default new RecipientController();
