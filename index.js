let name;
let description;
let commands = [];

const getNameDescription = () => name && description ? `${name} -- ${description}` : ``;

export const setCommands = (newCommands) => {
    commands = newCommands;
}

export const setDisplayHelpName = (newName) => {
    name = newName;
}

export const setDisplayHelpDescription = (newDescription) => {
    description = newDescription;
}

export const displayHelp = (m, exit=true) => {
    console.log(`${m ? m + '\n\n' : ''}${getNameDescription()}\nHelp:\n${commands.sort((a,b) => (a.option > b.option) ? 1 : ((b.option > a.option) ? -1 : 0))
        .map(cmd => `\t${cmd.option} ${cmd.requiresArgs ? cmd.displayArgs + ' ' : ''}- ${cmd.description}`).join('\n')}`);
    if(exit) process.exit();
}


export const getArgsObj = () => {
    let argsObj = {};
    process.argv.forEach((arg, i) => {
        let argument = arg.toLowerCase();
        let command = commands.find(command => (command.option === argument) || (command.aliases.indexOf(argument) !== -1));
        if(command) {
            if(command.requiresArgs) {
                if(process.argv[i+1] ? process.argv[i+1].startsWith('-') : true) {
                    argsObj[command.setVar] = null;  
                } else {
                    argsObj[command.setVar] = process.argv[i+1] || null;
                }
            } else {
                argsObj[command.setVar] = true;
            }
        }
    });
    return argsObj;
}

export default {
    setCommands,
    setDisplayHelpName,
    setDisplayHelpDescription,
    displayHelp,
    getArgsObj
}