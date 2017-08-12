import fs from 'fs';
import path from 'path';
import prompt from 'prompt';
import debug from 'debug';
import packageJSON from './../package.json';

const log = debug('scripts.create');

const schema = {
  properties: {
    name: {
      description: 'Enter the app name',
      pattern: /^[a-zA-Z-]+$/,
      message: 'name must not have a whitespace',
      required: true,
    },
    description: {
      description: 'Enter the app description',
    },
    repositoryURL: {
      description:
        'Enter the repository URL (e.g. git+https://github.com/username/your-app-name.git)',
      required: true,
    },
    author: {
      description: 'Enter the name of the author',
      required: true,
    },
  },
};

prompt.start();

prompt.get(schema, (err, result) => {
  if (err) throw new Error(err);

  packageJSON.name = result.name;
  packageJSON.description = result.description;
  packageJSON.repository.url = result.repositoryURL;
  packageJSON.bugs.url = `${result.repositoryURL.substring(
    4,
    result.repositoryURL.length - 4,
  )}/issues`;
  packageJSON.homepage = `${result.repositoryURL.substring(
    4,
    result.repositoryURL.length - 4,
  )}#readme`;
  packageJSON.author = result.author;
  log(packageJSON);

  // Write to package.json
  fs.writeFile(
    path.join(__dirname, '/../package.json'),
    JSON.stringify(packageJSON, null, 2),
    'utf8',
    error => {
      if (error) throw new Error(error);

      log('Successfully modified package.json!');
    },
  );
});
