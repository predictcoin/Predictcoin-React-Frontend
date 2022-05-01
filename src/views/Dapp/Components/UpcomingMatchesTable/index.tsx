import Table from "../Table/Table";
import TableBody from "../Table/TableBody";
import TableHead from "../Table/TableHead";
import TableHeader from "../Table/TableHeader";
import TableRow from "../Table/TableRow";
import "./upcomingmatchestable.styles.scss";
import UpcomingMatchesTableRow from "./UpcomingMatchesTableRow";
import { v4 as uuidv4 } from "uuid";
import { FC } from "react";
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
    skeletonBaseColor,
    skeletonHighlightColor
} from "../../constants/colors";
import TableData from "../Table/TableData";

const UpcomingMatchesTable: FC = () => {
    const {
        isLoadingUpcomingMatches,
        upcomingMatches,
        maxPredictions
    } = useSportPredictionViewModel();
    

    return (
        <div className="upcoming__matches__table">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead title={"date and time"} arrow />
                        <TableHead title={"match"} arrow />
                        <TableHead title={"prediction slots"} arrow />
                        <TableHead title={""} />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoadingUpcomingMatches &&
                        [...Array(5)].map((_, idx) => (
                            <TableRow key={uuidv4()} forTableBody>
                                {[...Array(4)].map((_) => (
                                    <SkeletonTheme
                                        key={uuidv4()}
                                        enableAnimation={true}
                                        baseColor={skeletonBaseColor}
                                        highlightColor={skeletonHighlightColor}
                                    >
                                        <TableData text={""}>
                                            <Skeleton height={21} />
                                        </TableData>
                                    </SkeletonTheme>
                                ))}
                            </TableRow>
                        ))}

                    {!isLoadingUpcomingMatches &&
                        upcomingMatches.length === 0 && (
                            <TableRow forTableBody>
                                <TableData text={""} colSpan={6}>
                                    <span className="no__data">
                                        No upcoming matches available
                                    </span>
                                </TableData>
                            </TableRow>
                        )}

                    {!!upcomingMatches.length &&
                        upcomingMatches.map((match) => (
                            <UpcomingMatchesTableRow
                                key={uuidv4()}
                                match={match}
                                maxPredictions={maxPredictions}
                            />
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UpcomingMatchesTable;
