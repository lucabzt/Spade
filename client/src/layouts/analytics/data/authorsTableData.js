/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import VuiBox from "../../../components/VuiBox";
import VuiTypography from "../../../components/VuiTypography";
import VuiAvatar from "../../../components/VuiAvatar";
import VuiBadge from "../../../components/VuiBadge";

// Importiere die lineChartDataDashboard-Daten
import { lineChartDataDashboard } from "./lineChartData";

// Images
import Jonas from "../../../assets/images/players/Jonas.jpeg";
import JuraJonas from "../../../assets/images/players/JuraJonas.png";
import Luca from "../../../assets/images/players/Luca.jpeg";
import Markus from "../../../assets/images/players/Markus.jpeg";
import Sebastian from "../../../assets/images/players/Sebastian2.jpeg";
import Paul from "../../../assets/images/players/Paul.jpeg";
import Matthi from "../../../assets/images/players/Matthi.jpeg";
import Eliah from "../../../assets/images/players/Eliah.png";

function Player({ image, name, username }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {username}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function PnL({ value }) {
  return (
    <VuiTypography variant="caption" fontWeight="medium" color="white">
      {value} €
    </VuiTypography>
  );
}

function DaysPlayed({ value }) {
  return (
    <VuiTypography variant="caption" fontWeight="medium" color="white">
      {value} days
    </VuiTypography>
  );
}

// Hilfsfunktion zur Synchronisierung der PnL-Werte
function getLatestPnL(playerName) {
  const chartData = lineChartDataDashboard.find((entry) => entry.name === playerName);
  if (chartData) {
    return chartData.data.slice(-1)[0]; // Der letzte Datenpunkt aus dem `data`-Array
  }
  return 0; // Standardwert, falls kein Spieler gefunden wird
}

export default {
  columns: [
    { name: "player", align: "left" },
    { name: "pnl", align: "left" },
    { name: "status", align: "center" },
    { name: "daysPlayed", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      player: <Player image={Sebastian} name="Sebastian" username="eixfachZabii" />,
      pnl: <PnL value={getLatestPnL("Sebastian")} />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Online"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      daysPlayed: <DaysPlayed value={45} />,
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      player: <Player image={Luca} name="Luca" username="BozzeBot" />,
      pnl: <PnL value={getLatestPnL("Luca")} />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Offline"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      daysPlayed: <DaysPlayed value={30} />,
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      player: <Player image={JuraJonas} name="Jura Jonas" username="LMU" />,
      pnl: <PnL value={getLatestPnL("Jura Jonas")} />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Online"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      daysPlayed: <DaysPlayed value={60} />,
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      player: <Player image={Paul} name="Paul" username="Ospuker" />,
      pnl: <PnL value={getLatestPnL("Paul")} />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Online"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      daysPlayed: <DaysPlayed value={80} />,
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      player: <Player image={Eliah} name="Eliah" username="Dr. BWL" />,
      pnl: <PnL value={getLatestPnL("Eliah")} />, // Synchronisierter "PnL"-Wert
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Online"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      daysPlayed: <DaysPlayed value={50} />, // Dummy-Wert für Tage gespielt
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      player: <Player image={Markus} name="Markus" username="Pussymagnet" />,
      pnl: <PnL value={getLatestPnL("Markus")} />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Offline"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      daysPlayed: <DaysPlayed value={25} />,
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      player: <Player image={Jonas} name="Jonas" username="Faszinierend" />,
      pnl: <PnL value={getLatestPnL("Jonas")} />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Offline"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      daysPlayed: <DaysPlayed value={15} />,
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      player: <Player image={Matthi} name="Matthi" username="Unroastbar" />,
      pnl: <PnL value={getLatestPnL("Matthi")} />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Online"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      daysPlayed: <DaysPlayed value={100} />,
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
  ],
};