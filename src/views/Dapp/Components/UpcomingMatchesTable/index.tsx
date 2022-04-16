import UpcomingMatchData from "../../data/UpcomingMatchData";
import Table from "../Table/Table";
import TableBody from "../Table/TableBody";
import TableHead from "../Table/TableHead";
import TableHeader from "../Table/TableHeader";
import TableRow from "../Table/TableRow";
import "./upcomingmatchestable.styles.scss";
import UpcomingMatchesTableRow from "./UpcomingMatchesTableRow";
import { v4 as uuidv4 } from 'uuid';
import { FC } from "react";

interface UpcomingMatchesTableProps {
    openMatchPredictionModal: () => void
}
const UpcomingMatchesTable: FC<UpcomingMatchesTableProps> = ({openMatchPredictionModal}) => {
  return (
    <div className = "upcoming__matches__table">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead title={'date and time'} arrow/>
                    <TableHead title={'match'} arrow/>
                    <TableHead title={'prediction slots'} arrow/>
                    <TableHead title={''} />
                </TableRow>
            </TableHeader>
            <TableBody>
                {UpcomingMatchData.map(match => <UpcomingMatchesTableRow key={uuidv4()} match = {match} openMatchPredictionModal = {openMatchPredictionModal} />  )}
            </TableBody>
        </Table>
    </div>
  )
}

export default UpcomingMatchesTable