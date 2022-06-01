import argslib from './index.js';

argslib.setDisplayHelpName('test');
argslib.setDisplayHelpDescription('args test');

argslib.setCommands([
    {
        option: '-test',
        aliases: ['-t', '-t1', '-test1'],
        description: 'Test 1',
        displayArgs: '[test1arg]',
        requiresArgs: true,
        setVar: 'test1value' 
    }, {
        option: '-test2',
        aliases: ['-t2'],
        description: 'Test 2 switch',
        displayArgs: '',
        requiresArgs: false,
        setVar: 'test2value' 
    }
])

const argsObj = argslib.getArgsObj();

console.log(argsObj)

argslib.displayHelp('help message no exit', false);

argslib.displayHelp('bye')