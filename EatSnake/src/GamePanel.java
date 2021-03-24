import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.util.Random;

//游戏的面板
public class GamePanel extends JPanel {

    //定义蛇的数据结构
    int length; //蛇的长度
    int[] snakeX = new int[600];    //蛇的x坐标
    int[] snakeY = new int[500];    //蛇的y坐标
    String fx;    //初始方向向右

    //食物的坐标
    int foodX;
    int foodY;
    Random random = new Random();

    //游戏当前的状态： 开始，停止
    boolean isStart = false;    //默认停止
    //游戏失败状态
    boolean isFail = false;
    //食物和蛇是否重合
    boolean isCoincidence = false;

    Timer timer = new Timer(100, new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent e) {
            if (isStart && !isFail) {  //如果游戏是开始状态，就让小蛇动起来

                //吃食物
                if (snakeX[0] == foodX && snakeY[0] == foodY) {
                    length++;   //长度加一，再次生成随机食物
                    foodX = 25 + 25 * random.nextInt(34);
                    foodY = 75 + 25 * random.nextInt(24);
                    refreshFood();
                }

                //移动
                for (int i = length-1; i > 0; i--) {    //后一节移动到前一节的位置
                    snakeX[i] = snakeX[i-1];
                    snakeY[i] = snakeY[i-1];
                }

                //走向
                switch (fx) {
                    case "R":
                        snakeX[0] += 25;
                        //边界判断
                        if (snakeX[0] > 850) {
                            snakeX[0] = 25;
                        }
                        break;
                    case "L":
                        snakeX[0] -= 25;
                        if (snakeX[0] < 25) {
                            snakeX[0] = 850;
                        }
                        break;
                    case "U":
                        snakeY[0] -= 25;
                        if (snakeY[0] < 75) {
                            snakeY[0] = 650;
                        }
                        break;
                    case "D":
                        snakeY[0] += 25;
                        if (snakeY[0] > 650) {
                            snakeY[0] = 75;
                        }
                        break;
                }

                //失败判定，撞到自己则游戏失败
                for (int i = 1; i < length; i++) {
                    if (snakeX[0] == snakeX[i] && snakeY[0] == snakeY[i]) {
                        isFail = true;
                        break;
                    }
                }
                repaint(); //重画
            }
            timer.start();  //定时器开启
        }
    }); //100毫秒执行一次

    //构造器
    public GamePanel() {
        this.init();
        this.setFocusable(true);    //获得焦点事件
        this.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                int keyCode = e.getKeyCode();
                if (keyCode == KeyEvent.VK_SPACE) { //如果按下空格键
                    if (isFail) {
                        isFail = false;
                        init();
                    } else {
                        isStart = !isStart; //取反
                    }
                    repaint();
                }

                //小蛇移动
                if (keyCode == KeyEvent.VK_UP && !fx.equals("D")) {
                    fx = "U";
                } else if (keyCode == KeyEvent.VK_DOWN && !fx.equals("U")) {
                    fx = "D";
                } else if (keyCode == KeyEvent.VK_RIGHT && !fx.equals("L")) {
                    fx = "R";
                } else if (keyCode == KeyEvent.VK_LEFT && !fx.equals("R")) {
                    fx = "L";
                }
            }
        });
        timer.start();  //一开始就启动定时器
    }

    public void init() {
        length = 3;
        snakeX[0] = 100; snakeY[0] = 100;
        snakeX[1] = 75; snakeY[1] = 100;
        snakeX[2] = 50; snakeY[2] = 100;
        fx = "R";
        //把食物随机分布在界面上
        foodX = 25 + 25 * random.nextInt(34);
        foodY = 75 + 25 * random.nextInt(24);
    }

    //绘制面板，游戏中的所有东西，都使用这个画笔来画
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);    //清屏

        //绘制静态的面板
        this.setBackground(Color.WHITE);
        Data.header.paintIcon(this, g, 25, 11); //头部广告栏
        g.fillRect(25, 75, 850, 600);   //默认的游戏界面

        //画食物
        refreshFood();
        Data.food.paintIcon(this, g, foodX, foodY);

        //把小蛇画上去
        switch (fx) {
            case "R":
                Data.right.paintIcon(this, g, snakeX[0], snakeY[0]);    //蛇头初始化向右
                break;
            case "L":
                Data.left.paintIcon(this, g, snakeX[0], snakeY[0]);
                break;
            case "U":
                Data.up.paintIcon(this, g, snakeX[0], snakeY[0]);
                break;
            case "D":
                Data.down.paintIcon(this, g, snakeX[0], snakeY[0]);
                break;
        }

        for (int i = 1; i < length; i++) {
            Data.body.paintIcon(this, g, snakeX[i], snakeY[i]); //蛇的第i个身体
        }

        //游戏状态
        if (!isStart) {
            g.setColor(Color.white);
            g.setFont(new Font("微软雅黑", Font.BOLD, 40));  //设置字体
            g.drawString("按下空格开始游戏", 300, 300);
        }

        if (isFail) {
            g.setColor(Color.RED);
            g.setFont(new Font("微软雅黑", Font.BOLD, 40));  //设置字体
            g.drawString("游戏失败！按空格重新开始", 225, 300);
        }
    }

    private void isCoin() {
        for (int i = 0; i < length; i++) {
            if (foodX == snakeX[i] && foodY == snakeY[i]) { //当食物与蛇重合时
                isCoincidence = true;
                break;
            }
        }
        isCoincidence = false;
    }

    private void refreshFood() {
        isCoin();
        while (isCoincidence) {
            foodX = 25 + 25 * random.nextInt(34);
            foodY = 75 + 25 * random.nextInt(24);
            isCoin();
        }
    }
}
