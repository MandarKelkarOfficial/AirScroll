//ndex2 script
const setup = () => {
  const getTheme = () => {
    if (window.localStorage.getItem("dark")) {
      return JSON.parse(window.localStorage.getItem("dark"));
    }

    return (
      !!window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const setTheme = (value) => {
    window.localStorage.setItem("dark", value);
  };

  const getColor = () => {
    if (window.localStorage.getItem("color")) {
      return window.localStorage.getItem("color");
    }
    return "cyan";
  };

  const setColors = (color) => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", `var(--color-${color})`);
    root.style.setProperty("--color-primary-50", `var(--color-${color}-50)`);
    root.style.setProperty("--color-primary-100", `var(--color-${color}-100)`);
    root.style.setProperty(
      "--color-primary-light",
      `var(--color-${color}-light)`
    );
    root.style.setProperty(
      "--color-primary-lighter",
      `var(--color-${color}-lighter)`
    );
    root.style.setProperty(
      "--color-primary-dark",
      `var(--color-${color}-dark)`
    );
    root.style.setProperty(
      "--color-primary-darker",
      `var(--color-${color}-darker)`
    );
    this.selectedColor = color;
    window.localStorage.setItem("color", color);
    //
  };

  const updateBarChart = (on) => {
    const data = {
      data: randomData(),
      backgroundColor: "rgb(207, 250, 254)",
    };
    if (on) {
      barChart.data.datasets.push(data);
      barChart.update();
    } else {
      barChart.data.datasets.splice(1);
      barChart.update();
    }
  };

  const updateDoughnutChart = (on) => {
    const data = random();
    const color = "rgb(207, 250, 254)";
    if (on) {
      doughnutChart.data.labels.unshift("Seb");
      doughnutChart.data.datasets[0].data.unshift(data);
      doughnutChart.data.datasets[0].backgroundColor.unshift(color);
      doughnutChart.update();
    } else {
      doughnutChart.data.labels.splice(0, 1);
      doughnutChart.data.datasets[0].data.splice(0, 1);
      doughnutChart.data.datasets[0].backgroundColor.splice(0, 1);
      doughnutChart.update();
    }
  };

  const updateLineChart = () => {
    lineChart.data.datasets[0].data.reverse();
    lineChart.update();
  };

  return {
    loading: true,
    isDark: getTheme(),
    toggleTheme() {
      this.isDark = !this.isDark;
      setTheme(this.isDark);
    },
    setLightTheme() {
      this.isDark = false;
      setTheme(this.isDark);
    },
    setDarkTheme() {
      this.isDark = true;
      setTheme(this.isDark);
    },
    color: getColor(),
    selectedColor: "cyan",
    setColors,
    toggleSidbarMenu() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    isSettingsPanelOpen: false,
    openSettingsPanel() {
      this.isSettingsPanelOpen = true;
      this.$nextTick(() => {
        this.$refs.settingsPanel.focus();
      });
    },
    isNotificationsPanelOpen: false,
    openNotificationsPanel() {
      this.isNotificationsPanelOpen = true;
      this.$nextTick(() => {
        this.$refs.notificationsPanel.focus();
      });
    },
    isSearchPanelOpen: false,
    openSearchPanel() {
      this.isSearchPanelOpen = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    isMobileSubMenuOpen: false,
    openMobileSubMenu() {
      this.isMobileSubMenuOpen = true;
      this.$nextTick(() => {
        this.$refs.mobileSubMenu.focus();
      });
    },
    isMobileMainMenuOpen: false,
    openMobileMainMenu() {
      this.isMobileMainMenuOpen = true;
      this.$nextTick(() => {
        this.$refs.mobileMainMenu.focus();
      });
    },
    updateBarChart,
    updateDoughnutChart,
    updateLineChart,
  };
};

// Dashboard script
const random = (max = 100) => {
  return Math.round(Math.random() * max) + 20;
};

const randomData = () => {
  return [
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
  ];
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const cssColors = (color) => {
  return getComputedStyle(document.documentElement).getPropertyValue(color);
};

const getColor = () => {
  return window.localStorage.getItem("color") ?? "cyan";
};

const colors = {
  primary: cssColors(`--color-${getColor()}`),
  primaryLight: cssColors(`--color-${getColor()}-light`),
  primaryLighter: cssColors(`--color-${getColor()}-lighter`),
  primaryDark: cssColors(`--color-${getColor()}-dark`),
  primaryDarker: cssColors(`--color-${getColor()}-darker`),
};

const barChart = new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: months,
    datasets: [
      {
        data: randomData(),
        backgroundColor: colors.primary,
        hoverBackgroundColor: colors.primaryDark,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          gridLines: false,
          ticks: {
            beginAtZero: true,
            stepSize: 50,
            fontSize: 12,
            fontColor: "#97a4af",
            fontFamily: "Open Sans, sans-serif",
            padding: 10,
          },
        },
      ],
      xAxes: [
        {
          gridLines: false,
          ticks: {
            fontSize: 12,
            fontColor: "#97a4af",
            fontFamily: "Open Sans, sans-serif",
            padding: 5,
          },
          categoryPercentage: 0.5,
          maxBarThickness: "10",
        },
      ],
    },
    cornerRadius: 2,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  },
});

const doughnutChart = new Chart(document.getElementById("doughnutChart"), {
  type: "doughnut",
  data: {
    labels: ["Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [random(), random(), random()],
        backgroundColor: [
          colors.primary,
          colors.primaryLighter,
          colors.primaryLight,
        ],
        hoverBackgroundColor: colors.primaryDark,
        borderWidth: 0,
        weight: 0.5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
    },

    title: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  },
});

const activeUsersChart = new Chart(
  document.getElementById("activeUsersChart"),
  {
    type: "bar",
    data: {
      labels: [...randomData(), ...randomData()],
      datasets: [
        {
          data: [...randomData(), ...randomData()],
          backgroundColor: colors.primary,
          borderWidth: 0,
          categoryPercentage: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: false,
          },
        ],
        xAxes: [
          {
            display: false,
            gridLines: false,
          },
        ],
        ticks: {
          padding: 10,
        },
      },
      cornerRadius: 2,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        prefix: "Users",
        bodySpacing: 4,
        footerSpacing: 4,
        hasIndicator: true,
        mode: "index",
        intersect: true,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
    },
  }
);

const lineChart = new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: months,
    datasets: [
      {
        data: randomData(),
        fill: false,
        borderColor: colors.primary,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: false,
          ticks: {
            beginAtZero: false,
            stepSize: 50,
            fontSize: 12,
            fontColor: "#97a4af",
            fontFamily: "Open Sans, sans-serif",
            padding: 20,
          },
        },
      ],
      xAxes: [
        {
          gridLines: false,
        },
      ],
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      hasIndicator: true,
      intersect: false,
    },
  },
});

let randomUserCount = 0;

const usersCount = document.getElementById("usersCount");

const fakeUsersCount = () => {
  randomUserCount = random();
  activeUsersChart.data.datasets[0].data.push(randomUserCount);
  activeUsersChart.data.datasets[0].data.splice(0, 1);
  activeUsersChart.update();
  usersCount.innerText = randomUserCount;
};

setInterval(() => {
  fakeUsersCount();
}, 1000);
