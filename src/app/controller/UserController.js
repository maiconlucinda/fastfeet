import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    // Buscando no Banco de Dados informações já salvas do usuário.
    const user = await User.findByPk(req.userId);

    // Validando se o usuário deseja alterar o email, caso sim, valido se o email está disponível.
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(401).json({ error: 'User already exists' });
      }
    }

    // Preciso valido a senha somente se o usuário estive enviando a senha antiga, então...
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Paswword does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
