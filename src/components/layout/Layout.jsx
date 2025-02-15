import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styled from "styled-components"

const Wrapper = styled.main`
    #topbar{
        margin-left: 25vw;
        height: 14vh;
    }
    #sidebar{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 25vw;
    }
    #outlet{
        margin-left: 25vw;
        min-height: 100vh;
        padding: 3rem;
    }
`




export default function Layout() {
	return (
		<Wrapper>
			<div id="topbar">
				<Topbar />
			</div>
			<div id="sidebar">
				<Sidebar />
			</div>
			<div id="outlet">
				<Outlet />
			</div>
		</Wrapper>
	);
}
