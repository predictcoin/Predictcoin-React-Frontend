import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import PredictionIcon from '../../../../assets/pics/txprediction.svg';
import {ReactComponent as ExternalLink} from "../../../../assets/pics/external-link.svg";
import "./TransactionModal.styles.scss";



interface TxModalProps {
	closeModal: Dispatch<SetStateAction<boolean>>;
}

const TxModal: FC<TxModalProps> = ({ closeModal }) => {
	const closeModalFunc = (e: any) => {
		if (e.target?.id === 'custom__modal') closeModal(false);
	};

	

	useEffect(() => {
		window.addEventListener('click', (e) => closeModalFunc(e));

		return () => {
			window.removeEventListener('click', (e) => closeModalFunc(e));
		};
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  // const notifications = [
  //   {
  //     time: "2 hours ago",
  //     title: "Staking successfull",
  //     subtitle: "",
  //     status: "",
  //     link: "",
  //     txhash: "",
  //     icon: ""
  //   },
  //   {
  //     time: "2 hours ago",
  //     title: "Staking successfull",
  //     subtitle: "",
  //     status: "",
  //     link: "",
  //     txhash: "",
  //     icon: ""
  //   },
  //   {
  //     time: "2 hours ago",
  //     title: "Staking successfull",
  //     subtitle: "",
  //     status: "",
  //     link: "",
  //     txhash: "",
  //     icon: ""
  //   },
  //   {
  //     time: "2 hours ago",
  //     title: "Staking successfull",
  //     subtitle: "",
  //     status: "",
  //     link: "",
  //     txhash: "",
  //     icon: ""
  //   }
  // ];

	return (
		<section id='custom__modal'>
			<div className='custom__modal__content'>
				<div>
          <div>
            <h4>Notifications</h4>
            <button>Clear all</button>
          </div>
          <ul>
            <li className="transaction">
              <div className="image">
                <img src={PredictionIcon} className="transaction__img" alt="tx-icon"/>
              </div>
              <div className="desc">
                <div><span>Staking successfull</span> <ExternalLink /></div>
                <span>Your staking is successful, </span>
                <div><span>2 hours ago</span> <a href="https://cronoscan.com">Go to Predictions</a></div>
              </div>
            </li>
          </ul>
        </div>
	
			</div>
		</section>
	);
};

export default TxModal;
