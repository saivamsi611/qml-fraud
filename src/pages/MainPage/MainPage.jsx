import React, { useState } from "react";
import {
  CssBaseline,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import Globe from "../../components/Globe";
import Marquee from "react-fast-marquee";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const drawerWidth = 220;

function MainPage() {
  const [selected, setSelected] = useState("Dashboard");
  const menuItems = ["Home", "Dashboard", "Reports", "Add New CSV"];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* 🌍 Background Globe */}
      <Globe />

      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            QML Fraud Detection Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 1,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((text) => (
              <ListItem
                button
                key={text}
                selected={selected === text}
                onClick={() => setSelected(text)}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          zIndex: 1,
          position: "relative",
        }}
      >
        <Toolbar />

        <Grid container spacing={3}>
          {/* Recent Alerts */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, background: "rgba(255,255,255,0.9)" }}>
              <Typography variant="h6">Recent Alerts</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>🚨 #7821 | $1200 | Nigeria | Risk: 92%</Typography>
              <Typography>⚠️ #7819 | $320 | Russia | Risk: 75%</Typography>
              <Typography>🔒 #7815 | $50 | USA | Risk: 10%</Typography>
            </Paper>
          </Grid>

          {/* Globe Center with Overlay */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            
          </Grid>

          {/* Key Metrics with Progress Bars */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, background: "rgba(255,255,255,0.9)" }}>
              <Typography variant="h6">Key Metrics</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>Total Txns: 12,543</Typography>
              <Typography color="error">Fraudulent: 245</Typography>
              <Typography>Fraud Rate: 1.95%</Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Model Performance</Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Box sx={{ width: 80, textAlign: "center" }}>
                  <CircularProgressbar
                    value={98}
                    text={`98%`}
                    styles={buildStyles({
                      textColor: "#000",
                      pathColor: "green",
                    })}
                  />
                  <Typography variant="body2">Accuracy</Typography>
                </Box>
                <Box sx={{ width: 80, textAlign: "center" }}>
                  <CircularProgressbar
                    value={94}
                    text={`94%`}
                    styles={buildStyles({
                      textColor: "#000",
                      pathColor: "blue",
                    })}
                  />
                  <Typography variant="body2">Precision</Typography>
                </Box>
                <Box sx={{ width: 80, textAlign: "center" }}>
                  <CircularProgressbar
                    value={92}
                    text={`92%`}
                    styles={buildStyles({
                      textColor: "#000",
                      pathColor: "orange",
                    })}
                  />
                  <Typography variant="body2">Recall</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Fraud Event Ticker */}
        <Box
          sx={{
            mt: 3,
            py: 1,
            background: "rgba(0,0,0,0.8)",
            color: "white",
            borderRadius: 1,
          }}
        >
          <Marquee gradient={false} speed={50}>
            🚨 Suspicious login prevented (IP: 45.33.12.8) | ⚠️ Multiple failed logins (User456) | 💰 High-risk transfer blocked: $12,000 | 🔒 Crypto wallet breach attempt detected
          </Marquee>
        </Box>

        
      </Box>
    </Box>
  );
}

export default MainPage;
