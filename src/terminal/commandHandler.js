import commands from './commandDefinitions';

const noCommandFoundMessage = (name) => `${name}: command not found`;

export default (terminal, commandString) => {
  if (!commandString) {
    return;
  }

  const [commandName, ...args] = commandString.split(' ');
  const command = commands[commandName];
  if (!command) {
    terminal.append(noCommandFoundMessage(commandName));
    return;
  }

  command(terminal, args);
};
