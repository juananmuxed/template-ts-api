import { useLoggerServer } from '@config/UseLoggerServer';
import { Roles } from '@db/models/Roles';
import { Users } from '@db/models/Users';

const log = useLoggerServer();

const dropAll = async () => {
  try {
    await Users.drop();
    await Roles.drop();
    log.simpleMessage('🗑️  DB dropped correctly');
  } catch (error) {
    throw new Error(error as string);
  }
};

dropAll();
