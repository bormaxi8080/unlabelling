import './index.less';
import {Application} from "./Application";
import {Messenger} from "./Messenger";
import {Root} from "./Component/Root";
import {Logo} from "./Component/Logo";
import {ToggleEnabled} from "./Component/ToggleEnabled";
import {Stats} from "./Component/Stats";

const messenger = new Messenger();

const dependencies = {
    messenger,
};

const components = [
    Root,
    Logo,
    ToggleEnabled,
    Stats,
];

new Application(dependencies, components).start();
