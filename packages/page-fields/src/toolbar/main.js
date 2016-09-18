import { createElement } from 'react'; /** @jsx createElement */
import Ribbon, { Tabs, ApplicationMenu, Tab, Header, Title, HelpSection } from 'ribbon-toolbar';

const Toolbar = () => (
	<Ribbon>
		<Header>
			<div />
			<Title>Fields</Title>
			<HelpSection />
		</Header>
		<ApplicationMenu />
		<Tabs>
			<Tab altKey="m" title="Map" />
		</Tabs>
	</Ribbon>
);

export default Toolbar;
