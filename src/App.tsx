import React, {Component} from 'react'
import MainView from './components/MainView';
import WorkspaceView from './components/workflow/WorkspaceView';

class App extends Component {
    
    render() {
        // Пока нет Роутов тестить элменты приходится тупую, просто комментить их и все, 
        // можно посмотреть как делать роуты или попробовать сделать диаолг юзера (Мой профиль - userProfileDiaolog)
        // 
        return(
            <div>
                <MainView/>
                {/* <WorkspaceView/> */}
            </div>
        );
  }
}

export default App;
