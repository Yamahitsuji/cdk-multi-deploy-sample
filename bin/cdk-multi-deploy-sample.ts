#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {
  SampleStack1,
  SampleStack2,
  SampleStack3,
} from "../lib/cdk-multi-deploy-sample-stack";

const app = new cdk.App();
const stack1 = new SampleStack1(app, "SampleStack1");
new SampleStack2(app, "SampleStack2", { vpc: stack1.vpc });
new SampleStack3(app, "SampleStack3");
