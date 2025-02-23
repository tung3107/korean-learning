import styled from "styled-components";
import { DashboardLayout } from "../Dashboard/Dashboard";
import AppHeader from "../../ui/AppHeader";

const AnalysisLayout = styled(DashboardLayout)`
  margin-left: 16%;
`;

function Analysis() {
  return (
    <AnalysisLayout>
      <AppHeader />
    </AnalysisLayout>
  );
}

export default Analysis;
