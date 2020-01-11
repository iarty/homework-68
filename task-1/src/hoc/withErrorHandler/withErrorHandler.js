import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class WithError extends Component {
        constructor(props) {
            super(props);

            this.state = {
                error: null,
                interceptorId: null,
                message: '',
                status: ''
            };

            this.state.interceptorId = axios.interceptors.response.use(res => {
                return res;
            }, error => {
                this.setState({error: error,
                    message: error.response.data,
                    status: error.response.status})
            })
        }

        errorDismissed = () => {
            this.setState({error: null});
        };

        componentWillUnmount() {
            axios.interceptors.response.eject(this.state.interceptorId);
        }

        render() {
            return (
                <Fragment>
                    <Modal close={this.errorDismissed} show={!!this.state.error}>
                        <h3>{this.state.status}</h3>
                        <p>{this.state.message}</p>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            )
        }
    }
};

export default withErrorHandler;
