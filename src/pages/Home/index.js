
import BarChart from "./Components/BarChart";


function Home() {


    return (
        <div>
            <BarChart
                title='三大框架使用情况'
                nameData={['Vue', 'React', 'Angular']}
                highData={[200, 500, 100]}
            />
        </div>
    );
}
export default Home;
