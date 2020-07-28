import commandDescriptions from './commandDescriptions';

export default {
  clear: (terminal) => {
    terminal.clear();
    return true;
  },
  pwd: (terminal) => terminal.append(terminal.context.currentPath),
  help: (terminal) => {
    const nameLength = 10;
    Object.keys(commandDescriptions).forEach(key => {
      const command = commandDescriptions[key];
      const name = key.padEnd(nameLength, ' ');
      
      if (typeof(command) === 'string') {
        terminal.append(`${name} - ${command}`);
      }
      else {
        terminal.append(`${name} - ${command.description}`)
        terminal.append('  arguments: ');
        command.args.forEach(arg => terminal.append(`  - ${arg}`));
      }
    })
  },
  ls: (terminal, args) => {
    const allDirs = terminal.context.directories;
    const searchPath = args.length === 0
      ? terminal.context.currentPath
      : getFullPath(terminal, args[0]);

    const searchDir = allDirs[searchPath];
    if (!searchDir) {
      terminal.append(`ls: cannot access ${args[0]}: No such file or directory`);
      return;
    }

    if (searchDir.isRestricted) {
      terminal.append(`ls: cannot access ${args[0]}: Permission denied`);
      return;
    }

    searchDir.files.forEach(file => terminal.append(file));
    Object.keys(allDirs).forEach(dir => {
      if (dir.startsWith(searchPath) &&
          dir !== searchPath) {
        terminal.append(dir.substr(searchPath.length + 1));
      }
    })
  },
  cd: (terminal, args) => {
    if (args.length === 0) {
      terminal.context.currentPath = terminal.context.homePath;
      return;
    }

    let path = getFullPath(terminal, args[0]);
    
    const allDirs = terminal.context.directories;
    if (Object.keys(allDirs).includes(path)) {
      if (allDirs[path].isRestricted) {
        terminal.append(`cd: ${path}: Permission denied`);
      }

      terminal.context.currentPath = path;
      return;
    }

    terminal.append(`cd: ${args[0]}: No such file or directory`);
  },
  cat: async (terminal, args) => {
    if (args.length === 0) {
      terminal.append('cat: No file specified');
      return;
    }

    const allDirs = terminal.context.directories;
    const path = getFullPath(terminal, args[0]);
    const file = splitFilePath(path);
    if (!Object.keys(allDirs).includes(file.dir) ||
        allDirs[file.dir].isRestricted ||
        !allDirs[file.dir].files.includes(file.name)) {
      terminal.append(`cat: ${args}: No such file`)
      return;
    }

    const res = await fetch(`${process.env.PUBLIC_URL}/data/${file.name}`);
    const data = await res.text();
    terminal.append(data);
  }
};

const getFullPath = (terminal, path) => path.startsWith('/')
  ? path 
  : `${terminal.context.currentPath}/${path}`;

const splitFilePath = (path) => {
  let fileStart = path.lastIndexOf('/');
  if (fileStart === -1) fileStart = 0;

  const name = path.substr(fileStart + 1);
  const dir = path.substr(0, fileStart);

  return { name, dir };
}
