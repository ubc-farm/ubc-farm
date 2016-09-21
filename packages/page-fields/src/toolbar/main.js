import { createElement } from 'react'; /** @jsx createElement */
import Ribbon, { TabList, Tab, ContextualTabs, Panel } from 'ribbon-toolbar';

const Toolbar = () => (
	<Ribbon>
		<header className="ribbon-header">
			<h1 className="ribbon-title">Fields</h1>
		</header>

		<TabList>
			<Tab id="m">Map</Tab>
			<ContextualTabs title="Field Options" hidden={false}>
				<Tab id="g">Grid</Tab>
			</ContextualTabs>
		</TabList>

		<Panel id="m"></Panel>
		<Panel id="e"></Panel>
		<Panel id="g"></Panel>
	</Ribbon>
);

export default Toolbar;
