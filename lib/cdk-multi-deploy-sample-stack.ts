import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as dynamo from "aws-cdk-lib/aws-dynamodb";

export class SampleStack1 extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, "VPC_A", {
      ipAddresses: ec2.IpAddresses.cidr("10.1.0.0/16"),
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "private",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });
  }
}

interface SampleStack2Props extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class SampleStack2 extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SampleStack2Props) {
    super(scope, id, props);

    new dynamo.Table(this, "SampleTable1", {
      tableName: "SampleTable1",
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: dynamo.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new ec2.Instance(this, "SampleEC2Instance", {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: new ec2.AmazonLinuxImage(),
    });
  }
}

export class SampleStack3 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new dynamo.Table(this, "SampleTable2", {
      tableName: "SampleTable2",
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: dynamo.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
