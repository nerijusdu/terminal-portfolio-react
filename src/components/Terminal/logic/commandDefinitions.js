export default {
  clear: (terminal) => {
    terminal.clear();
    return true;
  },
  pwd: (terminal) => terminal.append(terminal.context.currentPath),
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
  }
};

const getFullPath = (terminal, dir) => dir.startsWith('/')
  ? dir 
  : `${terminal.context.currentPath}/${dir}`;

