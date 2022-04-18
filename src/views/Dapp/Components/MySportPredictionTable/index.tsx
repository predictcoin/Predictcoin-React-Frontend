import Table from '../Table/Table'
import TableBody from '../Table/TableBody'
import TableHead from '../Table/TableHead'
import TableHeader from '../Table/TableHeader'
import TableRow from '../Table/TableRow'
import './my_sport_prediction.scss'
import MySportPredictionTableRow from './MySportPredictionTableRow'
import mySportPredictionData from '../../data/mySportPredictionData'
import { v4 as uuidv4 } from 'uuid';

const MySportPredictionTable = () => {
  return (
    <div className='my__sport__prediction__table'>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead title={''}/>
                    <TableHead title={'date and time'} arrow/>
                    <TableHead title={'match'} arrow/>
                    <TableHead title={'status'} arrow/>
                    <TableHead title={''} />
                    <TableHead title={''} />
                </TableRow>
            </TableHeader>
            <TableBody>
                {mySportPredictionData.map(sportPrediction => <MySportPredictionTableRow key = {uuidv4()} sportPrediction = {sportPrediction} />)}
            </TableBody>
        </Table>
    </div>
  )
}

export default MySportPredictionTable