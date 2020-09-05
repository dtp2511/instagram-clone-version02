import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  postButton: {
    outline: 'none',
    border: 'none',
    background: 'white',
    fontSize: '1rem',
    cursor: 'pointer',

    fontWeight: '700',
    color: '#0095f6',
  },
  fadeText: {
    opacity: 0.3,
  },
  link: theme.link,
  heartIcon: {
    fontSize: '1rem',
    marginRight: '0.5rem',
    cursor: 'pointer',
  },
  cardImage: {
    width: '100%',
    height: '450px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
}));
