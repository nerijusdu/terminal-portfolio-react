export default {
  clear: 'clear terminal window',
  pwd: 'print working directory',
  help: 'show help information',
  ls: {
    description: 'list files/folders in the directory',
    args: ['directory to search (if not provided current directory will be used']
  },
  cd: {
    description: 'change directory',
    args: ['target directory (if not provided will change to home directory']
  },
  cat: {
    description: 'read file',
    args: ['file to read']
  }
};