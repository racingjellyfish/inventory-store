/**
 * wrapper for top-level component
 */
import InventoryComponent from '../components/Inventory';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		isFetching: state.get('serverState').get('isFetching')
	};
};

const Inventory = connect(
	mapStateToProps
)(InventoryComponent);

export default Inventory;
