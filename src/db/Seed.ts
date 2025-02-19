import { Op } from 'sequelize';

import { Roles } from '@db/models/Roles';
import { Users } from '@db/models/Users';
import { parse } from 'utils/Parse';
import { ROLES } from './data/Roles';

export const seedDatabase = async () => {
  ROLES.forEach(async (role, index) => {
    await Roles.findOrCreate({
      where: {
        id: index,
      },
      defaults: {
        id: index,
        name: parse.camelCase(role),
      },
    });
  });

  await Users.findOrCreate({
    where: {
      [Op.and]: [
        { username: process.env.ROOT_USERNAME || 'root' },
        { email: process.env.ROOT_EMAIL || 'root@root.com' },
      ],
    },
    defaults: {
      email: process.env.ROOT_EMAIL || 'root@root.com',
      username: process.env.ROOT_USERNAME || 'root',
      password: process.env.ROOT_PASSWORD || '12345678',
      roleId: ROLES.findIndex((role) => role === 'ADMIN'),
    },
  });
};
