import InventoryRoot from '../components/InventoryRoot';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		isFetching: state.get('serverState').get('isFetching')
	};
};

const Inventory = connect(
	mapStateToProps
)(InventoryRoot);

export default Inventory;
