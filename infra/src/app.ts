#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MdPublicidadesStack } from './md-publicidades-stack';

const app = new cdk.App();

new MdPublicidadesStack(app, 'MdPublicidadesStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'MD Publicidades - Sitio web institucional',
});

app.synth();


