import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
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
    const { id } = req.params;
    console.log(id);

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

    return res.res(400).json({
      name,
      number,
      street,
      complement,
      city,
      cep,
      state,
    });
  }
}

export default new RecipientController();
