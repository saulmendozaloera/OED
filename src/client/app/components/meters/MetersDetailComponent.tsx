/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react';
import { Table, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import MeterViewContainer from '../../containers/meters/MeterViewContainer';
import HeaderContainer from '../../containers/HeaderContainer';
import FooterContainer from '../../containers/FooterContainer';
import TooltipMarkerComponent from '../TooltipMarkerComponent';
import TooltipHelpContainerAlternative from '../../containers/TooltipHelpContainerAlternative';

interface MetersDetailProps {
	loggedInAsAdmin: boolean;
	meters: number[];
	unsavedChanges: boolean;
	fetchMetersDetails(): Promise<any>;
	submitEditedMeters(): Promise<any>;
}

export default class MetersDetailComponent extends React.Component<MetersDetailProps, {}> {
	public componentDidMount() {
		this.props.fetchMetersDetails();
	}

	public render() {
		const loggedInAsAdmin = this.props.loggedInAsAdmin;

		const titleStyle: React.CSSProperties = {
			textAlign: 'center'
		};

		const tableStyle: React.CSSProperties = {
			marginLeft: '10%',
			marginRight: '10%'
		};

		const buttonContainerStyle: React.CSSProperties = {
			minWidth: '150px',
			width: '10%',
			marginLeft: '40%',
			marginRight: '40%'
		};

		const tooltipStyle = {
			display: 'inline',
			fontSize: '50%',
			tooltipMeterView: loggedInAsAdmin? 'help.admin.meterview' : 'help.meters.meterview'
		};

		return (
			<div>
				<HeaderContainer />
				<TooltipHelpContainerAlternative page='meters' />
				<div className='container-fluid'>
					<h2 style={titleStyle}>
						<FormattedMessage id='meters' />
						<div style={tooltipStyle}>
							<TooltipMarkerComponent page='meters' helpTextId={tooltipStyle.tooltipMeterView} />
						</div>
					</h2>
					<div style={tableStyle}>
					<Table striped bordered hover>
					<thead>
						<tr>
						{loggedInAsAdmin && <th> <FormattedMessage id='meter.id' /> </th>}
						{loggedInAsAdmin && <th> <FormattedMessage id='meter.name' /> </th>}
						<th> <FormattedMessage id='meter.identifier' /> </th>
						{loggedInAsAdmin && <th> <FormattedMessage id='meter.type' /> </th>}
						{loggedInAsAdmin && <th> <FormattedMessage id='meter.ip'/> </th>}
						{loggedInAsAdmin && <th> <FormattedMessage id='meter.gps'/> </th>}
						<th> <FormattedMessage id='meter.enabled' /> </th>
						<th> <FormattedMessage id='meter.displayable' /> </th>
						{loggedInAsAdmin && <th> <FormattedMessage id='meter.time.zone' /> </th>}
						</tr>
					</thead>
					<tbody>
					{ this.props.meters.map(meterID =>
						( <MeterViewContainer key={meterID} id={meterID} /> ))}
					</tbody>
					</Table>
					</div>
					{ loggedInAsAdmin && <Button
						color='success'
						style={buttonContainerStyle}
						disabled={!this.props.unsavedChanges}
						onClick={this.props.submitEditedMeters}
					>
						<FormattedMessage id='save.meter.edits' />
					</Button> }
				</div>
				<FooterContainer />
			</div>
		);
	}
}
