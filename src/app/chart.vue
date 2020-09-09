<script>
    import { Bar , mixins} from 'vue-chartjs'

    export default {
        extends: Bar,
        name: 'Chart',
        props: ['chartData'],
        mixins: [mixins.reactiveProp],
        data () {
            return {
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [ {
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0
                    },
                    hover: {
                        animationDuration: 0
                    },
                    responsiveAnimationDuration: 0
                }
            }
        },
        mounted () {
            this.renderChart(this.chartData, this.options)
            this.$data._chart.stop()
        },
        methods: {
            update() {
                //console.log('update')
                this.$data._chart.update()
            }
        },
        watch: {
            /*chartData: {
                deep: true,
                handler() {
                    //this.$data._chart.update()
                    //this.renderChart(this.chartData, this.options)
                }
            }*/

            chartData(){

/*
                if (Object.keys(this.chartData).length) {
                    var labels = [];
                    for (var i = 0; i < Object.keys(this.chartData).length; i++) {
                        labels.push(Object.keys(this.chartData));
                    }
                    this.renderChart({
                        labels: labels,
                        datasets: [
                            {

                                data: Object.values(this.chartData)
                            }
                        ]
                    }, {responsive: true, maintainAspectRatio: false})
                }else{
                    this._chart.destroy()
                }*/
            }
        }
    }
</script>