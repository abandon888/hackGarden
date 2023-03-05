import './index.scss'
import Bar from '../../components/Bar'

const Home = () => {
  return (
    <div>
      <Bar
        title= '使用echarts封装的Bar组件'
        xData={['react', 'vue', 'angular']}
        yData={[100, 300, 100]}
        style={{ width: '400px', height: '400px' }}
      />
    </div>
  )
}

export default Home
