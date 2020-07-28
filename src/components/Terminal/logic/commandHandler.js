import commands from './commandDefinitions';

const noCommandFoundMessage = (name) => `${name}: command not found`;

export default async (terminal, commandString) => {
  if (!commandString) {
    return;
  }

  terminal.append(commandString, true);

  const [commandName, ...args] = commandString.split(' ');
  const command = commands[commandName];
  if (!command) {
    terminal.append(noCommandFoundMessage(commandName));
    terminal.commit();
    return;
  }

  const preventCommit = await command(terminal, args, commandString);
  if (preventCommit !== true) {
    terminal.commit();
  }
};
