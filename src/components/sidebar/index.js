import React from 'react';
import { Link } from 'react-router-dom';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadPostsList } from '../../actions/posts';
import { isMember, getProfile } from '../../reducers/user';

// style
import CSSModules from 'react-css-modules';
import styles from './style.scss';

// components
import SignIn from '../sign-in';
import PostsList from '../../components/posts/list';

@connect(
  (state, props) => ({
    me: getProfile(state),
    isMember: isMember(state)
  }),
  dispatch => ({
  })
)
@CSSModules(styles)
export default class Sidebar extends React.Component {

  static defaultProps = {
    // 推荐帖子html
    recommendPostsDom: ''
  }

  constructor(props) {
    super(props);
  }

  render() {

    const { isMember, me, recommendPostsDom } = this.props
    
    /*
    <div className="card">
      <div className="card-body">
        <Link to="/me">
          <img src={me.avatar_url} styleName="avatar" />{me.nickname}
        </Link>
      </div>
    </div>
    */

    return(<div>

      {!isMember ?
        <div className="card">
          <div className="card-body"><SignIn /></div>
        </div> :
        null}

      {isMember ?
          <a href="/new-posts" styleName="new-posts" target="_blank">创建帖子</a>
        :
        null}

      {recommendPostsDom ?
        <div className="card">
          <div className="card-header">热门</div>
          <div className="card-body">
            <div styleName="recommend">
              {recommendPostsDom}
            </div>
          </div>
        </div>
        : null}

      <div>
        <p>源代码地址</p>
        <p>© 2018 渡鱼</p>
      </div>

    </div>)
  }

}
