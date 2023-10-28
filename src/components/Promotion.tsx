import { PieceType, Pieces } from '../gameLogic/initialPieces';
import { promote } from '../gameLogic/promote';

import styles from '../styles/Promostion.module.css';

type changePieces = (pieces: Pieces, isPromotion: boolean) => void;

const Promotion = ({
  publicName,
  piece,
  pieces,
  setPieces,
}:{
  publicName: string,
  piece: PieceType
  setPieces: changePieces,
  pieces: Pieces
}) => {
  const handleClick = () => {
    setPieces(promote(pieces, publicName, piece), true);
  }
  return (
    <div
      className={piece.color === 'white' ? styles.promotion : styles.black_promotion}
      onClick={handleClick}
    >
      <img
        src={`/${piece.image}`}
        alt={piece.name}
      />
    </div>
  );
};
export default Promotion;
