var _ = require('underscore');

var weka = require('../lib/weka-lib.js');

var arff = require('node-arff');

var data
    //ARFF json format (see [node-arff](https://github.com/chesles/node-arff))

//See Weka Documentation


function simplesCassificacao(file, classifier, cb) {
    arff.load(file, function(err, data) {

        if (!_.isNull(err)) {
            cb(err);
            return;
        }

        var testData = {
            Regio: 'norte',
            Genero: 'Fem',
            Ano: '2013',
            Internaes: '8672',
            AIH_aprovadas: '8672',
            Media_Internacoes_AIH_Aprovadas: '100',
            Valor_mdio_AIH: '506.6',
            Valor_mdio_intern: '506.6',
            Dias_permanncia: '24103',
            Mdia_permanncia: '2.8',
            bitos: '21',
            Taxa_mortalidade: '0.24',
            Valor_total: '4393239.86',
            Valor_servios_hospitalares: '4158352.05',
            Valor_servios_profissionais: '234887.81'
        };

        var options = {
            'classifier': 'weka.classifiers.bayes.NaiveBayes',
            //'classifier': 'weka.classifiers.functions.SMO',
            //'classifier': classifier,
            'params': ''
        };

        weka.classify(data, testData, options, function(err, result) {
            console.log("Deu Erro:" + err)
            console.log("Resultado:" + JSON.stringify(result)); //{ predicted: 'yes', prediction: '1' }

        });
    });
}

simplesCassificacao('./datasets/teste.arff', 'weka.classifiers.bayes.NaiveBayes', function(err) {
    console.log("Deu Erro:" + err);
});