

import javax.swing.*;

//游戏的主启动类
public class StartGame {

    public static void main(String[] args) {
        JFrame jFrame = new JFrame();

        //正常游戏界面都应该在界面上
        jFrame.add(new GamePanel());

        jFrame.setBounds(550, 200, 900, 720);
        jFrame.setResizable(false); //窗口大小不可变
        jFrame.setVisible(true);
        jFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    }
}
