import { exec } from 'child_process'

// Get the argument passed when running the script
const argument = process.argv[2];

if (!argument) {
  console.error('Error: Please provide a migration name as an argument.');
  process.exit(1);
}

// Run the typeorm migration:create command with the provided argument
const command = `npm run typeorm migration:create ./src/modules/database/typeorm/migrations/${argument}`;
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${stderr}`);
    process.exit(1);
  }
  console.log(stdout);
});