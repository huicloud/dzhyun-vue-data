import plugin from './plugin';
import DzhyunDataSource from './DataSource';
import DzhyunDataQuery from './DataQuery';
import DzhyunDataSubscribe from './DataSubscribe';

Object.assign(plugin, { DzhyunDataSource, DzhyunDataQuery, DzhyunDataSubscribe });

module.exports = plugin;
